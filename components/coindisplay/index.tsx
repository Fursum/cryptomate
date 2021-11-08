import { FunctionComponent } from "react";
import { useRouter } from "next/router";

import ImageFallback from "@components/imageFallback";
import { CoinData_T } from "@libs/coindata";
import FallbackImageFile from "@public/svg/raw/gear.svg"

import styles from "./coinDisplay.module.css";

interface Props {
  metadata: {
    base: CoinData_T;
    converted: CoinData_T;
  };
  price: string;
}

const CoinDisplay: FunctionComponent<Props> = ({ metadata, price }) => {
  const router = useRouter();
  const coinSymbol = router.query?.searchParams?.[0].toUpperCase();
  const convertedSymbol = router.query?.searchParams?.[1].toUpperCase();

  const baseName = metadata.base?.name;
  const convertedName = metadata.converted?.name;

  return (
    <div className={styles.outerDisplay}>
      <div className={styles.coinMetadata}>
        <ImageFallback
          src={`https://cryptoicons.org/api/icon/${coinSymbol?.toLowerCase()}/256/white`}
          fallbackSrc={FallbackImageFile}
          height={32}
          width={32}
          alt={`Logo of base asset ${coinSymbol}`}
        />
        <span
          className={styles.coinTitle}
        >{`${coinSymbol}/${convertedSymbol}`}</span>
        <ImageFallback
          src={`https://cryptoicons.org/api/icon/${convertedSymbol?.toLowerCase()}/256/white`}
          fallbackSrc={FallbackImageFile}
          height={32}
          width={32}
          alt={`Logo of converted asset ${coinSymbol}`}
        />
        <span>{` - ${baseName || coinSymbol}/${
          convertedName || convertedSymbol
        }`}</span>
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
