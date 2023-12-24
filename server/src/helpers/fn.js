export const generateCode = (value) => { 
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').split(' ').reduce((acc, current) => { 
        return acc + current.charAt(0) + current.charAt(1)
    },'') + `${value.length}`
}

 