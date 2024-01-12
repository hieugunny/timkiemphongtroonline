import icons from "./icons"
const {
    RiHeartLine,
    HiPencilSquare,// dang tin moi
    MdContentPasteSearch, // quan li tin dang
    IoCardOutline, // purchase
    MdOutlineHistory, // history 
    FaUserCircle, //user
    IoExitOutline, //exit
} = icons
const menuManage = [
    {
        id:1,
        text:'Đăng tin cho thuê',
        path:'/he-thong/dang-tin-moi',
        icon:<HiPencilSquare/>
    },
    {
        id:2,
        text:'Quản lý tin đăng',
        path:'/he-thong/quan-ly-bai-dang',
        icon:<MdContentPasteSearch/>
    },
    {
        id:3,
        text:'Nạp tiền',
        path:'/he-thong/nap-tien',
        icon:<IoCardOutline/>
    },
    {
        id:4,
        text:'Lịch sử nạp tiền',
        path:'/he-thong/lich-su-nap-tien',
        icon:<MdOutlineHistory/>
    },
    {
        id:5,
        text:'Thông tin cá nhân',
        path:'/he-thong/cap-nhat-thong-tin-ca-nhan',
        icon:<FaUserCircle/>
    },
    {
        id:6,
        text:'Tin đã lưu',
        path:'/he-thong/tin-da-luu',
        icon:<RiHeartLine/>
    },
    {
        id:7,
        text:'Danh sách tài khoản',
        path:'/he-thong/tin-da-luu',
        icon:<RiHeartLine/>
    },
]

export default menuManage