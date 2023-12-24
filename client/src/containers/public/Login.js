import React, { useEffect, useState } from 'react'
import { Button, InputForm } from '../../components'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import swal from 'sweetalert2'
const Login = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoggedIn, msg, update, err } = useSelector(state => state.auth)
  const [isRegister, SetIsRegister] = useState(location.state)
  const [invalidateField, setInvalidateField] = useState([])
  const [payLoad, setPayLoad] = useState({
    name: '',
    mobile: '',
    password: ''
  })

  useEffect(() => {
    SetIsRegister(location.state)
  }, [location.state])
  useEffect(() => {
    isLoggedIn && navigate('/') 
  }, [isLoggedIn])
  useEffect(() => {
    msg && swal.fire( err === 0 ? 'error' : 'success', msg, err === 0 ? 'error' : 'success')
  }, [msg, update])

  const handleSubmit = async () => {
    validate(payLoad)
    console.log(isRegister);  
    isRegister ? dispatch(actions.register(payLoad))
      .then((response) => {
        console.log(response);
      })
      : dispatch(actions.login(payLoad)) 
  }
  const validate = (payLoad) => {
    let invalid = 0
    let fields = Object.entries(payLoad)
    for (let el of fields) {
      if (el[1] === '') {
        if (el[0] === 'name' && !isRegister) {
          continue;
        }
        setInvalidateField(prev => [...prev, {
          name: el[0],
          message: 'Bạn không được bỏ trống phần này'
        }])
        invalid++
      }
      if (el[0] === 'password' && el[1].length < 6) {
        setInvalidateField(prev => [...prev, {
          name: el[0],
          message: 'Mật khẩu tối thiểu 6 kí tự'
        }])
        invalid++
      }
      if (el[0] === 'mobile' && !Number(el[1])) {
        setInvalidateField(prev => [...prev, {
          name: el[0],
          message: 'Sđt không hợp lệ'
        }])
        invalid++
      }
    }
  }

  return (
    <div className='bg-white p-[30px] pb-[100px] rounded-md shadow-sm'>
      <h3 className='font-semibold text-2xl mb-3'>{isRegister ? 'Đăng ký tài khoản' : 'Đăng nhập'}</h3>
      <div className='  flex flex-col gap-3'>
        {isRegister && <InputForm
          setInvalidateFields={setInvalidateField}
          invalidFields={invalidateField}
          label={'Họ và tên'}
          value={payLoad.name}
          setValue={setPayLoad}
          type={'name'} />}

        <InputForm
          setInvalidateFields={setInvalidateField}
          invalidFields={invalidateField}
          label={'Số điện thoại'}
          value={payLoad.mobile}
          setValue={setPayLoad}
          type={'mobile'} />

        <InputForm
          setInvalidateFields={setInvalidateField}
          invalidFields={invalidateField}
          label={'Mật khẩu'}
          value={payLoad.password}
          setValue={setPayLoad}
          type={'password'} />
        {/* {isRegister && <InputForm invalidFields={invalidFields} 
        label={'Nhập lại mật khẩu'} type={'password'} />} */}
        <Button text={isRegister ? 'Đăng ký' : 'Đăng nhập'}
          textColor={'text-white'}
          bgColor={'bg-[#3961fb]'}
          fullWidth
          onClick={handleSubmit} />
      </div>
      <div className='mt-7 flex justFify-between items-center'>
        {isRegister
          ? <small >Bạn đã có tài khoản?<span onClick={() => SetIsRegister(false)} className='text-[blue] hover:text-[orange] cursor-pointer'>Đăng nhập ngay</span></small>
          : <><small >Bạn quên mật khẩu</small>
            <small onClick={() => SetIsRegister(true)} className='text-[blue] hover:text-[orange] cursor-pointer'>Tạo tài khoản mới</small></>}
      </div>
    </div>
  )
}

export default Login