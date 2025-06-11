// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';
import { getEnvs } from '../helpers/getEnvs';

const supabaseUrl = getEnvs().BASE_URL;
const supabaseAnonKey = getEnvs().ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
