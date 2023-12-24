import db from '../models'
import { getData } from '../data/data'
import { generateCode } from '../helpers/fn'
// import fs from 'node:fs'
import removeAccent from '../helpers/removeAccent'
export const insertData = () => new Promise(async (resolve, reject) => {
    try {
        const categories = Object.keys(data)
        categories.map(async item => {
            await db.Category.create({
                code: generateCode(item),
                value: item
            })
        })
        categories.map(item => {
            let list = data[item]
            list?.map(async book => {
                await db.Book.create({
                    id: book.upc,
                    category_code: generateCode(item),
                    title: book.bookTitle,
                    price: book.bookPrice,
                    available: book.available,
                    image: book.imageUrl,
                    description: book.bookDescription
                })
            })
        })
        resolve('OK')
    } catch (error) {
        reject('this is reject')
        console.log(error)
    }
});
export const insertDataCate = () => new Promise(async (resolve, reject) => {
    try {
        const data = [
            {
                "code": "cho-thue-phong-tro",
                "value": "Cho thuê phòng trọ"
            },
            {
                "code": "nha-cho-thue",
                "value": "Nhà cho thuê"
            },
            {
                "code": "cho-thue-can-ho",
                "value": "Cho thuê căn hộ"
            },
            {
                "code": "mat-bang-van-phong",
                "value": "Mặt bằng, văn phòng"
            },
            {
                "code": "tim-nguoi-o-ghep",
                "value": "Tìm người ở ghép"
            }
        ]
        const result = await db.Category.bulkCreate(data)
        console.log(result);
        resolve('ok')
        // const categories = Object.keys(data)
        // categories.map(async item => {
        //     await db.Category.create({
        //         code: generateCode(item),
        //         value: item
        //     })
        // }) 
        // categories.map(item => {
        //     let list = data[item]
        //     list?.map(async book => {
        //         await db.Book.create({
        //             id: book.upc,
        //             category_code: generateCode(item),
        //             title: book.bookTitle,
        //             price: book.bookPrice,
        //             available: book.available,
        //             image: book.imageUrl,
        //             description: book.bookDescription
        //         })
        //     })
        // })  
    } catch (error) {
        reject('this is reject')
        console.log(error)
    }
});

export const insertMotel = () => new Promise(async (resolve, reject) => {
    try {
        const data = getData()
        const keys = Object.keys(data)
        let motels = []
        const handleAddress = (address) => {
            const arr = address.split(',')
            const street = arr[0]?.trim()
            const ward = arr.find(el => {
                return el.includes('Phường')
            })?.trim()
            const district = arr.find(el => {
                return el.includes('Quận')
            })?.trim()
            const province = arr[arr.length - 1]?.trim()
            return {
                street: street,
                ward: ward,
                district: district,
                province: province
            }
        }
        const rentalObjectHandler = (rentalObject) => {
            switch (rentalObject) {
                case 'Nam': return 'male'
                case 'Nữ': return 'female'
                default: return 'all'
            }
        }
        const handleRoomArea = (sq) => {
            let ra = ''
            for (let index = 0; index < sq.length && index !== sq.length - 1; index++) {
                ra += sq[index]
            }
            return ra
        }
        let i = 0
        const handlePrice = (price) => {
            if (+price < 100) return +price * 1000000
            if (!price) return 0
            return price * 1000
        }
        keys.forEach(key => {
            let d = data[key].filter(el => el.address.split(',').length === 4).map(el => {
                return {
                    title: el.title,
                    description: el.description,
                    images: JSON.stringify(el.images),
                    ...handleAddress(el.address),
                    roomArea: handleRoomArea(el.roomArea),
                    price: handlePrice(+el.price),
                    rentalObject: rentalObjectHandler(el.rentalObject),
                    zalo: el.zalo,
                    star: el.start || '1',
                    userId: 10,
                    category_code: key,
                    expiredAt: new Date(Date.now() + 35 * 3600 * 25 * 1000),
                }
            })
            motels = [...motels, ...d]
        });
        // const result = await db.Post.create(motels[0])
        const result = await db.Post.bulkCreate(motels)

        resolve({
            err: result ? 1 : 0,
            result
        })
        // const result = await db.Post.bulkCreate(data)
        // console.log(result);
        // const categories = Object.keys(data)
        // categories.map(async item => {
        //     await db.Category.create({
        //         code: generateCode(item),
        //         value: item
        //     })
        // }) 
        // categories.map(item => {
        //     let list = data[item]
        //     list?.map(async book => {
        //         await db.Book.create({
        //             id: book.upc,
        //             category_code: generateCode(item),
        //             title: book.bookTitle,
        //             price: book.bookPrice,
        //             available: book.available,
        //             image: book.imageUrl,
        //             description: book.bookDescription
        //         })
        //     })
        // })  
    } catch (error) {
        reject('this is reject')
        console.log(error)
    }
});

export const insertDataRole = () => new Promise(async (resolve, reject) => {
    try {
        const data = [
            {
                "code": "r1",
                "value": "admin"
            },
            {
                "code": "r2",
                "value": "poster"
            }
        ]
        const result = await db.Role.bulkCreate(data)
        console.log(result);
        resolve('ok')
        // const categories = Object.keys(data)
        // categories.map(async item => {
        //     await db.Category.create({
        //         code: generateCode(item),
        //         value: item
        //     })
        // }) 
        // categories.map(item => {
        //     let list = data[item]
        //     list?.map(async book => {
        //         await db.Book.create({
        //             id: book.upc,
        //             category_code: generateCode(item),
        //             title: book.bookTitle,
        //             price: book.bookPrice,
        //             available: book.available,
        //             image: book.imageUrl,
        //             description: book.bookDescription
        //         })
        //     })
        // })  
    } catch (error) {
        reject('this is reject')
        console.log(error)
    }
});


export const insertProvinces = () => new Promise(async (resolve, reject) => {
    try {
        const apiUrl = 'https://provinces.open-api.vn/api/?depth=3'
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                data.forEach(async p => {
                    await db.Province.create({
                        code: p.code,
                        name: p.name,
                        codename: p.codename,
                    })
                    p.districts.forEach(async d => { 
                        await db.District.create({
                            code: d.code,
                            name: d.name,
                            codename: d.codename,
                            pCode: p.code
                        })
                        d.wards.forEach(async w => { 
                            await db.Ward.create({
                                code: w.code,
                                name: w.name,
                                codename: w.codename,
                                pCode: p.code,
                                dCode: d.code,
                            })
                            
                        })
                    })
                })
            })
            .catch(error => {
                console.error('Error:', error);
            });
        resolve('ok')
    } catch (error) {
        reject('this is reject')
        console.log(error)
    }
});
