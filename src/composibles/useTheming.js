export default function useTheming() {
    const UpdateTheme = () => {
        let theme = localStorage.getItem("theme");
        console.log(`Theme: ${theme}`);
        if (theme == null || theme == "null") {
            theme = 'blue';
        }
        SwitchTheme(theme);
    }

    const SwitchTheme = (theme) => {
        document.body.classList.remove('light-theme', 'blue-theme');
        document.body.classList.add(`${theme}-theme`);
        localStorage.setItem("theme", theme)
    }

    return { UpdateTheme, SwitchTheme };
}