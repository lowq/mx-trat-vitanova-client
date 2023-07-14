/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: [
        {
          'dark': {    
            'primary' : '#793ef9',
            'primary-focus' : '#570df8',
            'primary-content' : '#ffffff',
            'secondary' : '#f000b8',
            'secondary-focus' : '#bd0091',
            'secondary-content' : '#ffffff',
            'accent' : '#37cdbe',
            'accent-focus' : '#2ba69a',
            'accent-content' : '#ffffff',
            'neutral' : '#2a2e37',
            'neutral-focus' : '#16181d',
            'neutral-content' : '#ffffff',
            'base-100' : '#3b424e',
            'base-200' : '#2a2e37',
            'base-300' : '#16181d',
            'base-content' : '#ebecf0',
            'info' : '#66c7ff',
            'success' : '#87cf3a',
            'warning' : '#e1d460',
            'error' : '#ff6b6b',
            '--rounded-box': '1rem', 
            '--rounded-btn': '.5rem', 
            '--rounded-badge': '1.9rem', 
            '--animation-btn': '.25s', 
            '--animation-input': '.2s',  
            '--btn-text-case': 'uppercase', 
            '--navbar-padding': '.5rem',
            '--border-btn': '1px',
          },
        },
        {
          'retro': {
            
  
   'primary' : '#ee9a95',
  
  
            
  
   'primary-focus' : '#e76b65',
  
  
            
  
   'primary-content' : '#252223',
  
  
  
            
  
   'secondary' : '#a4cbb4',
  
  
            
  
   'secondary-focus' : '#85b79a',
  
  
            
  
   'secondary-content' : '#252223',
  
  
  
            
  
   'accent' : '#ebdc99',
  
  
            
  
   'accent-focus' : '#e1cb6b',
  
  
            
  
   'accent-content' : '#252223',
  
  
  
            
  
   'neutral' : '#7c725a',
  
  
            
  
   'neutral-focus' : '#423d33',
  
  
            
  
   'neutral-content' : '#e4d8b4',
  
  
  
            
  
   'base-100' : '#e4d8b4',
  
  
            
  
   'base-200' : '#d2c59d',
  
  
            
  
   'base-300' : '#c6b386',
  
  
            
  
   'base-content' : '#252223',
  
  
  
            
  
   'info' : '#1c92f2',
  
  
            
  
   'success' : '#009485',
  
  
            
  
   'warning' : '#ff9900',
  
  
            
  
   'error' : '#ff5724',
  
  
  
            
  
  '--rounded-box': '.4rem',          
  
  
            
  
  '--rounded-btn': '.4rem',        
  
  
            
  
  '--rounded-badge': '.4rem',      
  
  
  
            
  
  '--animation-btn': '.25s',       
  
  
            
  
  '--animation-input': '.2s',       
  
  
  
            
  
  '--btn-text-case': 'uppercase',   
  
  
            
  
  '--navbar-padding': '.5rem',      
  
  
            
  
  '--border-btn': '1px',            
  
  
          },
        },
    ],
  }
}

