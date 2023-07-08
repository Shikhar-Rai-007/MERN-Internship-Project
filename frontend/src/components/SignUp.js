import React ,{useState} from 'react';

const Signup=()=>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPWD] = useState('');

    const register=async(e)=>{
        e.preventDefault();

        const newUser={name,email,password};

        try {
            const response = await axios.post('http://localhost:5000/admin/register', newUser);
            console.log('User Registration Successful');
          } catch (error) {
            console.error(error);
          }

    }
    return(
        <>
        <section className='signup'>
            <div className='container mt-5'>
                <div className='signup-content'>
                    <div className='signup-form'>
                        <h2 className='form-title'>SignUp Form</h2>
                        <form className='register-form' id='register-form' onSubmit={register}>
                            <div className='form-group'>
                                <input type='text' name='name' id='name' autoComplete='off'
                                placeholder='Enter Your Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}/>
                                
                            </div>

                            <div className='form-group'>
                                <input type='email' name='email' id='email' autoComplete='off'
                                placeholder='Enter Your Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}/>
                                
                            </div>

                            <div className='form-group'>
                                <input type='password' name='password' id='password' autoComplete='off'
                                placeholder='Enter Your Password'
                                value={password}
                                onChange={(e) => setPWD(e.target.value)}/>
                                
                            </div>

                            <div className='form-group form-button'>
                                <input type='submit' name='signup' id='signup' className='form-submit'
                                value='Register'/>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Signup