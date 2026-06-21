import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';
import uploadImage from '../../utils/uploadImage';


const SignUp = () => {

  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { updateUser } = useContext(UserContext);


  const [error, setError] = useState("");

  const navigate = useNavigate();

  // handle signup from submit

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Enter your Email");
      return;
    }

    if (!password) {
      setError("Enter the password");
      return;
    }

    setError("");

    try {
      // upload image
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        // console.log("Upload response:", imgUploadRes);

        profileImageUrl = imgUploadRes.imageUrl;
      }

      // console.log("Sending profileImageUrl:", profileImageUrl);

      // send request to backend
      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        {
          fullName,
          email,
          password,
          profileImageUrl,
        }
      );

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthLayout>
      <div className="lg:w-full h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-1.25 mb-6 '>Join us Today by Entering Your Details Below.</p>


        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className='grid gird-col-1 md:grid-cols-2 gap-4'>
            <Input value={fullName} onChange={({ target }) => setfullName(target.value)} label="Full Name" placeholder="John" type="text" />
            <Input type="email" value={email} onChange={({ target }) => setEmail(target.value)} label="Email Address" placeholder='john@Example.com' />
            <div className="col-span-2">
              <Input type="password" value={password} onChange={({ target }) => setPassword(target.value)} label="Password" placeholder='Min 8 Character' />
            </div>
          </div>

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
          <button type="submit" className='btn-primary'>SIGN UP</button>
          <p className='text-[13px] text-slate-800 mt-3'>Already Have an Account?{" "} <Link className='font-medium text-primary underline' to="/login">Login</Link> </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp;