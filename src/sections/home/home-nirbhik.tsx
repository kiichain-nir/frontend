import Image from 'next/image';

import logoLaravel from '@/images/logos/laravel.svg';
import logoMirage from '@/images/logos/mirage.svg';
import logoStatamic from '@/images/logos/statamic.svg';
import logoStaticKit from '@/images/logos/statickit.svg';
import logoTransistor from '@/images/logos/transistor.svg';
import logoTuple from '@/images/logos/tuple.svg';
import { Container, display, height } from '@mui/system';
import { Button, Stack, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { m } from 'framer-motion';
import { varFade } from 'src/components/animate';
import Iconify from 'src/components/iconify';

export default function Hero() {
  return (
    <Container
      style={{
        textAlign: 'center',
        paddingTop: '14rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Typography
        style={{
          margin: '0 auto',
          fontFamily: "'Inter', sans-serif",
          fontSize: '3.5rem',
          letterSpacing: '-0.02em',
          color: '#1e293b',
        }}
        variant="h3"
      >
        Revolutionizing{' '}
        <span style={{ position: 'relative', whiteSpace: 'nowrap', color: '#2563eb' }}>
          <svg
            aria-hidden="true"
            viewBox="0 0 418 42"
            style={{
              position: 'absolute',
              left: 0,
              top: '66.666667%',
              height: '0.58em',
              width: '100%',
              fill: 'rgba(96, 165, 250, 0.7)',
            }}
          >
            <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
          </svg>
          <span style={{ position: 'relative' }}>AID with</span>
        </span>{' '}
        Blockchain.
      </Typography>
      <m.div variants={varFade().inUp}>
        <Typography
          sx={{
            mb: 5,
            color: 'text.secondary',
            textAlign: 'center',
            maxWidth: '38rem',
            margin: '1.5rem auto',
          }}
        >
          Using KiiChain Blochain, Nirbhik will streamline fund distribution, ensuring secure,
          transparent, and efficient aid to vulnerable communities globally.
        </Typography>
      </m.div>
      <div
        style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}
      >
        <Button
          size="large"
          color="inherit"
          variant="outlined"
          target="_blank"
          rel="noopener"
          href={'/'}
        >
          Learn more
        </Button>
        <Button
          size="large"
          color="primary"
          variant="outlined"
          rel="noopener"
          href={'/projects'}
          endIcon={<Icon icon="mingcute:add-line" width={12} />}
        >
          Create your project
        </Button>
      </div>

      <div style={{ marginTop: '6rem' }}>
        <Typography
          sx={{
            mb: 5,
            color: 'text.secondary',
            textAlign: 'center',
            maxWidth: '38rem',
            margin: '1.5rem auto',
          }}
        >
          Supported by these organizations so far
        </Typography>
        <div
          role="list"
          style={{
            marginTop: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          {[
            {
              name: 'Red cross nepal',
              logo: 'https://nrcs.org/wp-content/uploads/2020/04/NRCS_logo_nepali.jpg',
            },
            {
              name: 'JCI Nepal',
              logo: 'https://jcinepal.org.np/images/logo.png',
            },
            {
              name: 'Merit Pokhara',
              logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqysYuQfrFFQC3x59yJCbRX5ak1KffovJwrLAcKg4Ca0T5bfmW907Y1hTR_FV_aQof-SA&usqp=CAU',
            },
            {
              name: 'Laxmi Adarsha Youth Clubs',
              logo: '/assets/laxmi-adarsha.jpg',
            },
            {
              name: 'Red cross nepal',
              logo: 'https://nrcs.org/wp-content/uploads/2020/04/NRCS_logo_nepali.jpg',
            },
            {
              name: 'JCI Nepal',
              logo: 'https://jcinepal.org.np/images/logo.png',
            },
          ].map((company, groupIndex) => (
            <img
              key={groupIndex}
              src={company.logo}
              alt={company.name}
              style={{ width: '10%', height: 'auto' }}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: '6rem',
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ width: '63%', backgroundImage: '/assets/background/ConnectWallet.jpeg' }}>
          <img
            src="/assets/heart-victims.png"
            width={300}
            alt="RWA"
            style={{ width: '100%', borderRadius: '10px', marginLeft: '-10rem' }}
          />
        </div>
        <Stack
          sx={{
            textAlign: { xs: 'left', md: 'left', maxWidth: '37%', marginTop: '5rem' },
          }}
        >
          <m.div variants={varFade().inUp}>
            <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
              Aid For Every Need!
            </Typography>
          </m.div>

          <m.div variants={varFade().inUp}>
            <Typography variant="h2" sx={{ my: 3 }}>
              RWAs for <span style={{ textDecoration: 'underline', color: '#007FFF' }}>Impact</span>
            </Typography>
          </m.div>

          <m.div variants={varFade().inUp}>
            <Typography
              sx={{
                mb: 5,
                color: 'text.secondary',
                textAlign: 'justify',
              }}
            >
              Anything can be tokenized, whether it's disaster relief, aid for the poor, medical
              assistance, or any other form of help. Nirbhik empowers you to tokenize and fairly
              distribute aid to those who need it most.
            </Typography>
          </m.div>
          <m.div variants={varFade().inUp}>
            <Button
              size="large"
              color="inherit"
              variant="outlined"
              target="_blank"
              rel="noopener"
              href={
                'https://www.coinbase.com/learn/crypto-glossary/what-are-real-world-assets-rwa#:~:text=Real%2DWorld%20Assets%20(RWAs),engage%20with%20high%2Dvalue%20assets.'
              }
              endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
            >
              Learn More About RWA
            </Button>
          </m.div>
        </Stack>
      </div>
    </Container>
  );
}
