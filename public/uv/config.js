self.__uv$config = {
    prefix: '/a/',
    bare: '/bare/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/uv/handler.js',
    bundle: '/uv/bundle.js',
    config: '/uv/config.js',
    sw: '/uv/sw.js',
};