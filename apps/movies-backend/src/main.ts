import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder().setTitle('SEP6 - Movie Project').setVersion('1.0').addBearerAuth().build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
    app.enableCors({
        allowedHeaders: '*',
        origin: '*',
    });
    await app.listen(3000);
}
bootstrap();
