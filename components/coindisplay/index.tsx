import { FunctionComponent } from "react";

import ImageFallback from "@components/imageFallback";
import FallbackImageFile from "@public/svg/raw/gear.svg";

import styles from "./coinDisplay.module.css";

interface Props {
  metadata: {
    baseName: string;
    baseSymbol: string;
    convertedName: string;
    convertedSymbol: string;
  };
  price: string;
}

const CoinDisplay: FunctionComponent<Props> = ({ metadata, price }) => {
  const baseSymbol = metadata.baseSymbol;
  const convertedSymbol = metadata.convertedSymbol
  const baseName = metadata.baseName;
  const convertedName = metadata.convertedName;

  return (
    <div className={styles.outerDisplay}>
      <div className={styles.coinMetadata}>
        <ImageFallback
          src={`https://cryptoicons.org/api/icon/${baseSymbol.toLowerCase()}/256/white`}
          fallbackSrc={FallbackImageFile}
          height={32}
          width={32}
          alt={`Logo of base asset ${baseSymbol}`}
        />
        <span className={styles.coinTitle}>{`${baseSymbol}/${convertedSymbol}`}</span>
        <ImageFallback
          src={`https://cryptoicons.org/api/icon/${convertedSymbol.toLowerCase()}/256/white`}
          fallbackSrc={FallbackImageFile}
          height={32}
          width={32}
          alt={`Logo of converted asset ${baseSymbol}`} 
        />
        <span>{` - ${baseName || baseSymbol}/${convertedName || convertedSymbol}`}</span>
      </div>

      <div className={styles.priceInfo}>
        <span>
          Avg {convertedSymbol} price in last 5 mins {price}
        </span>
      </div>
    </div>
  );
};

export default CoinDisplay;
