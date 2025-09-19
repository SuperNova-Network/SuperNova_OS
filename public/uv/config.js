// UV Config with proper error handling
try {
    self.__uv$config = {
        prefix: '/supernova/',
        bare: '/bare/',
        encodeUrl: Ultraviolet.codec.xor.encode,
        decodeUrl: Ultraviolet.codec.xor.decode,
        handler: '/uv/handler.js',
        bundle: '/uv/bundle.js',
        config: '/uv/config.js',
        sw: '/uv/sw.js',
    };
    console.log('UV Config loaded successfully');
} catch (error) {
    console.error('UV Config failed to load:', error);
    // Fallback config
    self.__uv$config = {
        prefix: '/supernova/',
        bare: '/bare/',
        encodeUrl: (url) => encodeURIComponent(url),
        decodeUrl: (url) => decodeURIComponent(url),
        handler: '/uv/handler.js',
        bundle: '/uv/bundle.js',
        config: '/uv/config.js',
        sw: '/uv/sw.js',
    };
}