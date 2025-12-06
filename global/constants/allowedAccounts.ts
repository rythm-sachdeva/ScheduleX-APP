import FontAwesome from "@expo/vector-icons/FontAwesome";

export const AllowedAccounts:AccountInfo[] =[ 
    {
        socialAccount:"LinkedIn",
        icon:'linkedin-square',
    },
    {
        socialAccount:'Facebook',
        icon:'facebook-square'
    },
    {
        socialAccount:'Instagram',
        icon:'instagram'
    },
    {
        socialAccount:"Youtube",
        icon:'youtube'
    }
]


export type AccountInfo ={
    socialAccount:string,
    icon: keyof typeof FontAwesome.glyphMap,
}
