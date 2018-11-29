const path = require('path')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
	mode: "development",
	target: 'web',
	entry: path.join(__dirname, 'src/index.js'),
	output: {
		filename: 'bundle.[hash:8].js',
		path: path.join(__dirname, 'dist')
	},
	module: {
		rules: [
		  {
		  	test: /\.vue$/,
		  	loader: 'vue-loader'
		  },
		  {
		  	test: /\.jsx$/,
		  	loader: 'babel-loader'
		  },
		  {
		  	test: /\.(gif|jpg|jpeg|png|svg)$/,
		  	use: [
		  	  {
		  	  	loader: 'url-loader',
		  	  	options: {
		  	  		limit: 1024,
		  	  		name: '[name]-aaa.[ext]'
		  	  	}
		  	  }
		  	]
		  }
		]
	},
	//第二处
  plugins: [
    new webpack.DefinePlugin({
    	'process.env': {
    		NODE_ENV: isDev ? '"development"' : '"production"'
    	}
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin()
  ]
}

if (isDev) {
	config.module.rules.push({	
		  	test: /\.styl/,
		  	use: [
		  	  'style-loader',
		  	  'css-loader',
		  	  {
		  	  	loader: 'postcss-loader',
		  	  	options: {
		  	  		sourceMap: true,
		  	  	}
		  	  },
		  	  'stylus-loader'
		  	]
	})
	config.devtool = '#cheap-module-eval-source-map'
	config.devServer = {
		port: 8000,
		host: '0.0.0.0',
		overlay: {
			errors: true,
		},
		hot: true
	}
	config.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	)
 }else {
 	  config.entry = {
 	  	app: path.join(__dirname, 'src/index.js'),
 	  	vendor: ['vue']
 	  }
		config.output.filename = '[name].[chunkhash:8].js'
		config.module.rules.push(
			{
		  	test: /\.styl/,
		  	use: ExtractPlugin.extract({
		  		fallback: 'style-loader',
		  		use: [
		  	  'css-loader',
		  	  {
		  	  	loader: 'postcss-loader',
		  	  	options: {
		  	  		sourceMap: true,
		  	  	}
		  	  },
		  	  'stylus-loader'
		  	  ]
		  	})		  	
		  },
		)		
		config.plugins.push(
			new ExtractPlugin('style.[chunkHash:8].css'),
		)
		config.optimization = {
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: 'initial',
            minChunks: 2, maxInitialRequests: 5,
            minSize: 0
          }, 
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10,
            enforce: true
          }
        }
      }
    }
	}

module.exports = config