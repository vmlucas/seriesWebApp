const PROXY_CONFIG=[
    {
        context: [
            '/buscarSeries',
            '/buscarSerie',
            '/insertSerie',
            '/updateSerie',
            '/consolidadoQtdAno',
            '/consolidadoQtdProviderAno' 
        ],
        target: "https://homeapp-l1le.onrender.com/",
        secure: false,
        changeOrigin: true,
        pathRewrite:{
            "^/":""
        }
    }
]

module.exports = PROXY_CONFIG;