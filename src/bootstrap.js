"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const cookie_Parser_1 = __importDefault(require("cookie-Parser"));
const glob_1 = __importDefault(require("glob"));
// requires all the files which conform to the given pattern and returns the list of defaults exports
function requireDefaults(pattern) {
    return glob_1.default.sync(pattern, { cwd: __dirname, absolute: true })
        .map(require)
        .map(imported => imported.default);
}
// requires all the controllers in the app
const controllers = requireDefaults('*.module/*-controller.ts');
// requires all the global middleware in the app
const middleware = requireDefaults('*.module/*-middleware.ts');
let ApplicationModule = class ApplicationModule {
    configure(consumer) {
        consumer.apply((0, cookie_Parser_1.default)(), ...middleware).forRoutes('/');
    }
};
ApplicationModule = __decorate([
    (0, common_1.Module)({
        controllers
    })
], ApplicationModule);
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, typeorm_1.createConnection)();
        const app = yield core_1.NestFactory.create(ApplicationModule);
        // allows for validation to be used
        app.useGlobalPipes(new common_1.ValidationPipe());
        // allows for NestJS's auto documentation feature to be used
        const options = new swagger_1.DocumentBuilder().addBearerAuth().build();
        const document = swagger_1.SwaggerModule.createDocument(app, options);
        swagger_1.SwaggerModule.setup('/', app, document);
        yield app.listen(3000);
    });
}
exports.bootstrap = bootstrap;
//# sourceMappingURL=bootstrap.js.map