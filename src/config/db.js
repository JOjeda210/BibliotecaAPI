require('dotenv').config();
// CONEXIÓN HECHA A TRAVES DE CLIENTE DE SUPERBASE
const { createClient } = require ('@supabase/supabase-js');
const superBaseURL = process.env.SUPERBASE_URL; 
const superBaseKEY = process.env.SUPERBASE_KEY; 
const superbase = createClient(superBaseURL,superBaseKEY);

console.log('Cliente de Supabase inicializado correctamente.');
module.exports = superbase;