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
const menuSideBar = [
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
        text:'Nạp tiền vào tài khoản',
        path:'/he-thong/nap-tien',
        icon:<FiDollarSign/>
    },
    {
        id:4,
        text:'Lịch sử nạp tiền',
        path:'/he-thong/lich-su-nap-tien',
        icon:<GoClock/>
    },
    {
        id:5,
        text:'Lịch sử thanh toán',
        path:'/he-thong/lich-su-thanh-toan',
        icon:<CiCalendar/>
    },
    {
        id:6,
        text:'Bảng giá dịch vụ',
        path:'/bang-gia-dich-vu',
        icon:<GoPaste/>
    },
    {
        id:6,
        text:'Liên hệ',
        path:'/lien-he',
        icon:<IoChatbubbleOutline/>
    },
]

export default menuSideBar