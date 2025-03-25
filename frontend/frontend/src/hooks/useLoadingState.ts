import { useEffect, useState } from 'react';
import { useNavigation } from 'react-router-dom';

export default function useLoadingState(delay = 300) {
    const navigation = useNavigation();
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        let timer;
        if (navigation.state === 'loading') {
            timer = setTimeout(() => setShowLoader(true), delay);
        } else {
            setShowLoader(false);
        }
        return () => clearTimeout(timer);
    }, [navigation.state, delay]);

    return showLoader;
}
