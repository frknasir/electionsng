/*
    Defines the API route we are using.
*/
var api_url = '';

switch( process.env.NODE_ENV ){
    case 'development':
        api_url = 'http://127.0.0.1:8000/api/v1';
    break;
    case 'production':
        api_url = 'https://electionsng.com/api/v1';
    break;
}

export const CONFIG = {
    API_URL: api_url,
    STATUSES: {
        'idle': 0,
        'loading': 1,
        'completed_with_success': 2,
        'completed_with_failure': 3
    }
};