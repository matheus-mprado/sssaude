import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
    colors:{
        gray:{
            "950":"#010101",
            "800":"#121212",
            "790":"#212529",
            "750":"#222222",
            "700":"#333333",
            "600":"#4B4D63",
            "500":"#616480",
            "400":"#8f9299",
            "300":"#afafaf",
            "200":"#dcdcdc",
            "150":"#eaeaea",
            "50" :"#f6f6f6",
        },
        red:{
            "400":"#ec7c6c"
        }
    },
    fonts:{
        heading:'Poppins',
        body:"Poppins",  
    },
    styles:{
        global:{
            body:{
                bg:'gray.50',
                color:'gray.750'
            }
        }
    }
})