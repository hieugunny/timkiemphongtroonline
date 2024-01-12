import icons from "./icons"
const {
    LiaNewspaper,
    TfiPencilAlt,
    FiDollarSign,
    GoClock,
    CiCalendar,
    GoPaste,
    IoChatbubbleOutline,
    RxExit
} = icons
const menuSideBarAdmin = [
    {
        id:1,
        text:'Quản lý tin đăng',        
        path:'/he-thong/quan-ly-tin-dang',
        icon:<LiaNewspaper/>
    },
    {
        id:2,
        text:'Thông tin cá nhân',
        path:'/he-thong/cap-nhat-thong-tin-ca-nhan',
        icon:<TfiPencilAlt/>
    },
    {
        id:3,
        text:'Quản lý tài khoản',
        path:'/he-thong/quan-ly-nguoi-dung',
        icon:<FiDollarSign/>
    },  
    {
        id:6,
        text:'Liên hệ',
        path:'/lien-he',
        icon:<IoChatbubbleOutline/>
    },
]

export default menuSideBarAdmin