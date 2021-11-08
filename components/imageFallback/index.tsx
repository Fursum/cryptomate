import { FunctionComponent, useState } from 'react';
import Image, { ImageProps } from 'next/image';

//Taken from https://stackoverflow.com/questions/66949606/what-is-the-best-way-to-have-a-fallback-image-in-nextjs

interface FallbackProps extends ImageProps {
    fallbackSrc: string
}

const ImageFallback:FunctionComponent<FallbackProps> = (props) => {
    
    const { src, fallbackSrc, alt, ...rest } = props;
    const [imgSrc, setImgSrc] = useState(false);
    const [oldSrc, setOldSrc] = useState(src);
    if (oldSrc!==src)
    {
        setImgSrc(false)
        setOldSrc(src)
    }
    return (
        <Image
            {...rest}
            src={imgSrc?fallbackSrc:src}
            onError={() => {
                setImgSrc(true);
            }}
            alt={alt}
        />
    );
};

export default ImageFallback;