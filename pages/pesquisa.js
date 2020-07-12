import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import PageTitle from '../components/PageTitle'

const Pesquisa = () => {
    const [ form, setForm ] = useState({
        Nome: '',
        Email: '',
        Whatsapp: '',
        Nota: 0
    })
    const {register, handleSubmit, errors } = useForm()
    const notas = [0, 1, 2, 3, 4, 5]
    const [ sucess, setSuccess ] = useState(false)
    const [ retorno, setRetorno ] = useState({})
    const save = async () => {
        const response = await fetch('/api/save', {
            method: 'POST',
            body: JSON.stringify(form)
        })
        const data = await response.json()
        setSuccess(true)
        setRetorno(data)
    }
    const onChange = evt => {
        const value = evt.target.value
        const Key = evt.target.name
        setForm(old => ({
            ...old,
            [Key]: value
        }))
    }
    return (
        <div className='pt-6'>
            <PageTitle title='Pesquisa' />
            <h1 className='text-center font-bold my-4 text 2xl'>Críticas e sugestões</h1>
            <p className='text-center mb-6'>
                O restaurante X sempre busca por atender melhor seus clientes.<br />
                Por isso, estamos sempre abertos a ouvir a sua opinião.
            </p>
            <p className='italic text-center p-2'>*Campos obrigatórios!</p>
            {!sucess && <div className='w-1/5 mx-auto'>
                <label className='font-bold'>Seu nome:*</label>
                <input type='text' className='p-4 block shadow bg-blue-100 my-2 rounded' placeholder='Nome' onChange={onChange} name='Nome' value={form.Nome} ref={register({ required: true })} />
                <label className='font-bold'>E-mail:*</label>
                <input type='text' className='p-4 block shadow bg-blue-100 my-2 rounded' placeholder='Email' onChange={onChange} name='Email' value={form.Email} ref={register({ required: true })} />
                <label className='font-bold'>Whatsapp:*</label>
                <input type='text' className='p-4 block shadow bg-blue-100 my-2 rounded' placeholder='Whatsapp' onChange={onChange} name='Whatsapp' value={form.Whatsapp} ref={register({ required: true })} />
                <label className='font-bold'>Nota:</label>
                <div className='flex'>
                { notas.map(nota => {
                return (
                    <label className='block w-1/6 text-center py-6'>
                        {nota}<br />
                        <input type='radio' name='Nota' value={nota} onChange={onChange} />
                    </label> 
                    )}
                )}
                </div>
                <button className='bg-blue-400 px-12 py-4 mb-4 font-bold rounded-lg shadow-lg hover:shadow' onClick={handleSubmit(save)}>Salvar</button>
            </div>}
            { sucess && <div className='w-1/5 mx-auto'>
                <p className='text-center mb-6 bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3'>Obrigado por contribuir com sua sugestão ou crítica.</p>
                    {
                        retorno.showCoupon && <div className='text-center border p-4 mb-4'>
                        Seu cupom: <br />
                        <span className='font-bold text-2xl'>{retorno.Cupom}</span>
                        </div>
                    }
                    {
                        retorno.showCoupon && <div className='text-center border p-4 mb-4'>
                        <span className='font-bold block mb-2'>{retorno.Promo}</span>
                        <br />
                        <span className='italic'>Tire um print ou foto desta tela e apresente para o garçon.</span>
                        </div>
                    }
            </div>}
        </div>
    )
}
export default Pesquisa