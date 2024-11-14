import Register_Form from '@/components/register-form'
import React from 'react'
import bg_login from '@/assets/images/bg-auth.png'

const Register = () => {
  return (
    <div>
        <div className="top-padding w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="hidden lg:block relative p-2">
            <img
              src={bg_login}
              alt="Image"
              width="1920"
              height="1080"
              className="h-full w-full rounded-xl object-cover"
            />
            <span className="absolute bottom-4 left-4 bg-gray-200 opacity-75 text-black px-3 py-1 rounded-full text-sm">
              <a href="https://www.pexels.com/photo/low-angle-photography-of-gray-concrete-building-259950/" target="_blank" rel="noopener noreferrer">
                Photo by Unplash
              </a>
            </span>
          </div>
          <div className="flex items-center justify-center py-5">
            <Register_Form/>
          </div>
        </div>
      </div>
  )
}

export default Register