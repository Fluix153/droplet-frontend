export const environment = {
    production: false,
    apiBaseUrl: 'http://localhost:3001',
    monitoring: {
        apiBaseUrl: 'http://localhost:3001',
        alertsEndpoint: '/alerts',
        sensorsEndpoint: '/sensors'
    },
    support: {
        apiBaseUrl: 'http://localhost:3001',
        ticketsEndpoint: '/supportTickets'
    }
};
