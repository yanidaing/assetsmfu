# Asset Management System

## Overview

Asset management system for Mae Fah Luang University (MFU) built with Next.js and Node.js

## Main Features

- 🔐 Google OAuth Authentication
- 📊 Asset statistics dashboard
- 📋 Asset management (add, edit, delete, search)
- 🏢 Department-based filtering
- 📱 Responsive design
- 🎨 Modern UI/UX

## Asset Status System

The system supports 6 asset status types:

| Status | Display Name | Color | Meaning |
|--------|--------------|-------|---------|
| `active` | Active | 🟢 Green | In system and functioning normally |
| `transferring` | Transferring | 🟡 Yellow | Being transferred, waiting for destination confirmation |
| `audited` | Audited | 🔵 Blue | Audited in this year's audit cycle |
| `missing` | Missing | 🔴 Red | Not found during audit |
| `broken` | Broken | 🟠 Orange | Damaged, cannot be used |
| `disposed` | Disposed | ⚫ Gray | Disposed / No longer in service |

## Installation

### Prerequisites
- Node.js (v16+)
- MySQL (v8.0+)
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env file with your configuration
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Database Setup
1. Create MySQL database
2. Import SQL file from `assets.sql`
3. Run status update script: `backend/scripts/update_asset_status_enum.sql`

## Usage

### For Admins
- Access Admin Dashboard
- Manage all assets
- Edit asset status
- View statistics reports

### For Users
- View assets in their department
- Search assets
- View asset details

## Latest Updates

### Status System Update (v2.0)
- Added 6 new asset status types
- Updated UI to support new statuses
- Added backend validation
- Improved colors and icons to match meanings

See more details at: [STATUS_UPDATE_README.md](STATUS_UPDATE_README.md)

## Project Structure

```
assets/
├── backend/                 # Backend API (Node.js/Express)
│   ├── controllers/         # API Controllers
│   ├── models/             # Database Models
│   ├── routes/             # API Routes
│   └── scripts/            # Database Scripts
├── frontend/               # Frontend (Next.js)
│   ├── src/
│   │   ├── components/     # React Components
│   │   ├── contexts/       # React Contexts
│   │   ├── pages/          # Next.js Pages
│   │   └── styles/         # CSS Styles
│   └── public/             # Static Assets
└── docs/                   # Documentation
```

## API Endpoints

### Assets
- `GET /api/assets` - Get asset list
- `POST /api/assets` - Create new asset
- `PUT /api/assets/:id` - Update asset
- `DELETE /api/assets/:id` - Delete asset
- `PATCH /api/assets/barcode/:barcode/status` - Update status via barcode

### Authentication
- `GET /auth/google` - Google OAuth login
- `GET /auth/callback` - OAuth callback
- `GET /auth/logout` - Logout

## Development

### Running in Development Mode
```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

### Testing
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## Deployment

### Backend Deployment
- Use Node.js hosting (Heroku, Vercel, Railway)
- Set environment variables
- Use MySQL cloud database

### Frontend Deployment
- Deploy to Vercel or Netlify
- Set environment variables
- Use custom domain (if needed)

## Troubleshooting

### Common Issues
1. **Database Connection Error**: Check .env file
2. **OAuth Error**: Check Google OAuth credentials
3. **Status Display Issues**: Check CSS classes

### Solutions
1. Check console errors
2. Check network requests
3. Check database schema
4. Read additional documentation

## License

MIT License - See [LICENSE](LICENSE) file for details

## Contact

For questions or usage issues, please contact the development team
# assetsmfu
