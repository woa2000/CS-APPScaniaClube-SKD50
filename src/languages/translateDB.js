export function useTrasnlactionDynamic(pt, en, language) {
    return ('pt' === language ? pt : (en ?? pt));
}

