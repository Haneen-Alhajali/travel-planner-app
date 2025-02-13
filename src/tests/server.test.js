const request = require('supertest');
const app = require('../server/server');
const http = require('http');

let server;

// Generate a dynamic future date (current date +1 day)
const today = new Date();
const nextDay = new Date(today);
nextDay.setDate(today.getDate() + 1);
const futureDate = nextDay.toISOString().split('T')[0]; // Formats as YYYY-MM-DD

beforeAll(() => {
    jest.setTimeout(15000);
    server = http.createServer(app);
    return new Promise((resolve) => {
        server.listen(() => resolve());
    });
});

afterAll(() => {
    return new Promise((resolve) => {
        server.close(() => {
            console.log('Server closed');
            resolve();
        });
    });
});

describe('Trip Data API Tests', () => {
    test('POST /getTripData - Valid Request', async () => {
        const response = await request(app)
            .post('/getTripData')
            .send({ destination: 'Paris', travelDate: futureDate });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('destination');
        expect(response.body).toHaveProperty('travelDate');
        expect(response.body).toHaveProperty('countdown');
        expect(response.body).toHaveProperty('weather');
        expect(response.body.weather).toHaveProperty('highTemp');
        expect(response.body.weather).toHaveProperty('lowTemp');
        expect(response.body.weather).toHaveProperty('description');
        expect(response.body).toHaveProperty('imageUrl');
    }, 15000);

    test('POST /getTripData - Missing Parameters', async () => {
        const response = await request(app)
            .post('/getTripData')
            .send({ destination: '' });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    test('POST /getTripData - Invalid Location', async () => {
        const response = await request(app)
            .post('/getTripData')
            .send({ destination: 'InvalidLocationXYZ', travelDate: futureDate });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    });
});
