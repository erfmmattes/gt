import React from 'react'
import Link from 'next/link'
import PageTitle from '../components/PageTitle'

const Contato = () => {
    return (
        <div>
        <PageTitle title='Contato' />
            <h1 className='text-center font-bold my-4 text 2xl'>Contato</h1>
            <p className='text-center mb-6 italic'>
                Para realizar pedidos, entrar em contato com os nossos canais de atendimento.
            </p>
            <div className='container mx-auto text-center font-bold text-black mb-6'>
                <a className='hover:underline p-3' href='#' target='_blank'>Whatsapp: 51 9.938-76354</a> {' '}<br />
                <a className='hover:underline p-3' href='#' target='_blank'>Instagram: @restaurante_x</a> {' '}<br />
                <a className='hover:underline p-3' href='#' target='_blank'>Facebook.com/restaurante_x</a> {' '}<br />
                <a className='hover:underline p-3' href='#' target='_blank'>Site: www.RESTAURANTEX.com.br</a>
            </div>
        </div>
    )
}
export default Contato