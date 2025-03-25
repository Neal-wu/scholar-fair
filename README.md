# Scholar Fair

A platform to share experiences and keep scholar fair. This platform allows users to share their experiences anonymously, fostering transparency and accountability in academia.

## Features

- Share experiences anonymously
- Search by country, university, department, or individuals
- Comment and reply system
- Mobile-responsive design
- Privacy-focused

## Tech Stack

- Next.js 13+ (App Router)
- TypeScript
- Prisma (PostgreSQL)
- Tailwind CSS

## Getting Started

1. Clone the repository:
```bash
git clone <your-repo-url>
cd scholar-fair
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
- Copy `.env.example` to `.env`
- Update the `DATABASE_URL` with your PostgreSQL connection string

4. Set up the database:
```bash
npx prisma migrate dev
npx prisma generate
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment

This application can be deployed on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add the `DATABASE_URL` environment variable in Vercel
4. Deploy!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License
