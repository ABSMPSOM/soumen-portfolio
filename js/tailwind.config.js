tailwind.config = {
    theme: {
        extend: {
            fontFamily: { sans: ['Poppins', 'sans-serif'] },
            colors: {
                neoBg: 'var(--bg-color)',
                
                // Restoring these so bg-neoDarkShadow/50 and border-neoLightShadow/20 work perfectly
                neoDarkShadow: 'rgb(var(--neo-dark-shadow-rgb) / <alpha-value>)',
                neoLightShadow: 'rgb(var(--neo-light-shadow-rgb) / <alpha-value>)',
                
                // Text colors that flip automatically
                white: 'var(--text-main)', 
                gray: {
                    100: 'var(--text-main)', 
                    200: 'var(--text-sub)',  
                    300: 'var(--text-sub)',  
                    400: 'var(--text-muted)', 
                    500: 'var(--text-muted)', 
                    600: 'var(--text-muted)', 
                }
            },
            boxShadow: {
                'neo-out': '8px 8px 16px var(--shadow-dark), -8px -8px 16px var(--shadow-light)',
                'neo-in': 'inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light)',
            }
        }
    }
}