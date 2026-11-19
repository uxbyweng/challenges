import { Controller, Get, Injectable, Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

/* ********************************************** */
/* CONCERTS
/* ********************************************** */

// CONCERTS TYPE
type Genre = "rock" | "jazz" | "classical" | "electronic" | "pop";
type Concert = {
    id: string;
    title: string;
    artist: string;
    venue: string;
    date: Date;
    ticketPrice: number;
    genre: Genre;
};

// CONCERTS SERVICE
@Injectable()
class ConcertsService {
    private readonly concerts: Concert[] = [
        {
            id: "0b8c2f1e-3d4a-4c5b-9e6f-7a8b9c0d1e2f",
            title: "Late Night Standards",
            artist: "Mina Okafor Quartet",
            venue: "Jazzkeller Hamburg",
            date: new Date("2026-12-04T20:00:00Z"),
            ticketPrice: 28,
            genre: "jazz",
        },
        {
            id: "5e6f7a8b-9c0d-4e1f-8a2b-3c4d5e6f7a8b",
            title: "Static Bloom Tour",
            artist: "Neon Harbor",
            venue: "Columbiahalle Berlin",
            date: new Date("2027-01-16T19:30:00Z"),
            ticketPrice: 45,
            genre: "electronic",
        },
    ];

    findAll(): Concert[] {
        return this.concerts;
    }
}

// CONCERTS CONTROLLER
@Controller()
class ConcertsController {
    constructor(private readonly concertsService: ConcertsService) {}

    // @Get("concerts")
    // findAll() {
    //     return [{ title: "Late Night Standards", artist: "Mina Okafor Quartet" }];
    // }
    @Get("concerts")
    findAll() {
        return this.concertsService.findAll();
    }
}

/* ********************************************** */
/* THREADS
/* ********************************************** */

// THREADS TYPE
type Thread = {
    id: string;
    title: string;
    author: string;
    body: string;
    createdAt: Date;
};

// THREADS SERVICE
@Injectable()
class ThreadService {
    private readonly threads: Thread[] = [
        {
            id: "4f5362f7-ee63-495a-8903-8240d95f6625",
            title: "Tabs or spaces, final answer?",
            author: "pixelpirate",
            body: "My team argues about this in every code review. What does your formatter do?",
            createdAt: new Date("2026-11-12T08:15:00Z"),
        },
        {
            id: "733f77d2-f899-4580-8d60-8bac152930c7",
            title: "Why does my useEffect run twice?",
            author: "neonbyte",
            body: "In development, every effect in my React app runs twice. In production, it runs once.",
            createdAt: new Date("2026-11-13T19:42:00Z"),
        },
        {
            id: "43f04043-20cf-4e7a-a430-4cbdf13a5f36",
            title: "Best keyboard for long coding sessions",
            author: "nullpointer",
            body: "My wrists hurt after a full day. Split keyboard, low profile, or something else?",
            createdAt: new Date("2026-11-14T10:05:00Z"),
        },
        {
            id: "ec5074f4-aacf-4f5b-b96b-beb7763d6073",
            title: "Is SQLite enough for a side project?",
            author: "neonbyte",
            body: "I expect maybe a hundred users. Do I really need a database server?",
            createdAt: new Date("2026-11-16T21:30:00Z"),
        },
        {
            id: "1ee0c21f-27cd-4eb3-9bb6-ab1975a77f56",
            title: "Show your terminal setup",
            author: "pixelpirate",
            body: "Prompt, font, color scheme: post a screenshot and tell us what you can't live without.",
            createdAt: new Date("2026-11-17T07:55:00Z"),
        },
    ];

    findAll(): Thread[] {
        return this.threads;
    }
}

// THREADS CONTROLLER
@Controller()
class ThreadsController {
    constructor(private readonly threadsService: ThreadService) {}

    @Get("threads")
    findAll() {
        return this.threadsService.findAll();
    }
}

/* ********************************************** */
/* MODULE 
/* ********************************************** */

@Module({
    controllers: [ConcertsController, ThreadsController],
    providers: [ConcertsService, ThreadService],
})
class AppModule {}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
