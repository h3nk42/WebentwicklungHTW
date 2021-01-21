import {useState, useEffect} from 'react';

export default function UseDarkMode() {
    const body = document.querySelector("body");
    const storedDarkMode = localStorage.getItem("darkMode");

    const [componentMounted, setComponentMounted] = useState(false);
    const [darkMode, setDarkMode] = useState(storedDarkMode);

    const setMode = mode => {
        localStorage.setItem('darkMode', mode);
        setDarkMode(mode);
    }

    const toggleDarkMode = () => {
        setMode(darkMode === 'dark' ? 'light' : 'dark');
    };

    useEffect(() => {
        if (darkMode === 'dark') {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
        setComponentMounted(true);
    }, [darkMode]);

    return [darkMode, toggleDarkMode, componentMounted]
}
