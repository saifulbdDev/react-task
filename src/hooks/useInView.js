import { useRef, useState, useEffect } from 'react';

const useInView = (options) => {
    const [inView, setInView] = useState(false);
    const containerRef = useRef(null);

    const callback = (entries) => {
        const [entry] = entries;
        setInView(entry.isIntersecting);
    };

    useEffect(() => {
        const _observer = new IntersectionObserver(callback, options);
        if (containerRef.current) _observer.observe(containerRef.current);

        return () => {
            if (containerRef.current) _observer.unobserve(containerRef.current);
        };
    }, [options]);

    // For Manual observers
    const observe = (element, callback) => {
        const _observer = new IntersectionObserver(callback, options);
        containerRef.current = element.current;
        return _observer;
    };

    const unObserve = (observer) => {
        if (containerRef.current) observer.unobserve(containerRef.current);
    };

    return {
        inView,
        ref: containerRef,
        observe,
        unObserve
    };
};

export default useInView;