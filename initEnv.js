const path = require('path');

if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
} else if (process.env.NODE_ENV === 'test') {
    const envPath = path.resolve(process.cwd(), '.env.test');
    require('dotenv').config({ path: envPath });
}

