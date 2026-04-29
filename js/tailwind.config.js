tailwind.config = {
            theme: {
                extend: {
                    fontFamily: { sans: ['Poppins', 'sans-serif'] },
                    colors: {
                        neoBg: '#16181d',
                        neoDarkShadow: '#0d0f12',
                        neoLightShadow: '#1f2128',
                    },
                    boxShadow: {
                        'neo-out': '8px 8px 16px #0d0f12, -8px -8px 16px #1f2128',
                        'neo-in': 'inset 5px 5px 10px #0d0f12, inset -5px -5px 10px #1f2128',
                    }
                }
            }
        }