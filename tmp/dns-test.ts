import dns from 'dns';

const host = 'ep-cold-art-al16we8v.c-3.eu-central-1.aws.neon.tech';

console.log(`Diagnosing DNS for ${host}...`);

dns.lookup(host, (err, address, family) => {
    if (err) {
        console.error('DNS Lookup Failed!', err);
    } else {
        console.log(`Success! Address: ${address}, Family: IPv${family}`);
    }
});
