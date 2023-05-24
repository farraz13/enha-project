import React, { Component } from 'react';
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Sukses extends Component {
    render() {
        return (
            <div className='mt-4 text-center'>
                <Image src="assets/images/success.png" width={460} />
                <h2>Pesanan Berhasil Dibuat</h2>
                <p>Terima Kasih telah Memesan</p>
                <Button variant='primary' as={Link} to='/'>Back to Menu</Button>
            </div>
        );
    }
}

export default Sukses;
