/**
 * Copyright 2019-2021 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const baseConstants = require('generator-jhipster/generators/generator-constants');
const constants = require('../generator-dotnetcore-constants');
const utils = require('../utils');

/* Constants use throughout */

const INTERPOLATE_REGEX = baseConstants.INTERPOLATE_REGEX;
const SERVER_SRC_DIR = constants.SERVER_SRC_DIR;
const SERVER_TEST_DIR = constants.SERVER_TEST_DIR;
const PROJECT_APPLICATION_SUFFIX = constants.PROJECT_APPLICATION_SUFFIX;
const PROJECT_CROSSCUTTING_SUFFIX = constants.PROJECT_CROSSCUTTING_SUFFIX;
const PROJECT_SERVICE_SUFFIX = constants.PROJECT_SERVICE_SUFFIX;
const PROJECT_INFRASTRUCTURE_SUFFIX = constants.PROJECT_INFRASTRUCTURE_SUFFIX;
const PROJECT_API_SUFFIX = constants.PROJECT_API_SUFFIX;
const serverFiles = {
    server: [
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Domain/Entities/Entity.cs',
                    renameTo: generator =>
                        `${generator.namespace}${constants.PROJECT_DOMAIN_SUFFIX}/Entities/${generator.asEntity(
                            generator.entityClass
                        )}.cs`,
                },
                {
                    file: 'Project.Api/Controllers/EntityController.cs',
                    renameTo: generator => `${generator.mainProjectDir}${PROJECT_API_SUFFIX}/Controllers/${generator.pascalizedEntityClassPlural}Controller.cs`,
                },
                {
                    file: 'Project.Api/Mappers/EntityMapper.cs',
                    renameTo: generator => `${generator.mainProjectDir}${PROJECT_API_SUFFIX}/Mappers/${generator.pascalizedEntityClass}Mapper.cs`,
                },
                {
                    file: 'Project.Domain/Repositories/Interfaces/IEntityRepository.cs',
                    renameTo: generator =>
                        `${generator.namespace}${constants.PROJECT_DOMAIN_SUFFIX}/Repositories/I${generator.asEntity(
                            generator.entityClass
                        )}Repository.cs`,
                },
                {
                    file: 'Project.Infrastructure/Data/Repositories/EntityRepository.cs',
                    renameTo: generator =>
                        `${generator.namespace}${PROJECT_INFRASTRUCTURE_SUFFIX}/Data/Repositories/${generator.asEntity(
                            generator.entityClass
                        )}Repository.cs`,
                },
                {
                    file: 'Project.Infrastructure/Data/Mappers/DataMapper.cs',
                    renameTo: generator =>
                        `${generator.namespace}${PROJECT_INFRASTRUCTURE_SUFFIX}/Data/Mappers/${generator.asEntity(
                            generator.entityClass
                        )}DataMapper.cs`,
                },
                {
                    file: 'Project.Domain/Repositories/Interfaces/IEntityReadOnlyRepository.cs',
                    renameTo: generator =>
                        `${generator.namespace}${constants.PROJECT_DOMAIN_SUFFIX}/Repositories/I${generator.asEntity(generator.entityClass)}ReadOnlyRepository.cs`,
                },
                {
                    file: 'Project.Infrastructure/Data/Repositories/EntityReadOnlyRepository.cs',
                    renameTo: generator =>
                        `${generator.namespace}${PROJECT_INFRASTRUCTURE_SUFFIX}/Data/Repositories/${generator.asEntity(
                            generator.entityClass
                        )}ReadOnlyRepository.cs`,
                },
            ],
        },
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Api/Configuration/AutoMapper/AutoMapperProfile.cs',
                    renameTo: generator => `${generator.mainProjectDir}${PROJECT_API_SUFFIX}/Configuration/AutoMapper/AutoMapperProfile.cs`,
                },
            ],
        },
        {
            condition: generator => generator.cqrsEnabled === true,
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Application/Queries/EntityGetQuery.cs',
                    renameTo: generator =>
                        `${generator.namespace}${PROJECT_APPLICATION_SUFFIX}/Queries/${generator.asEntity(
                            generator.entityClass
                        )}/${generator.asEntity(generator.entityClass)}GetQuery.cs`,
                },
                {
                    file: 'Project.Application/Queries/EntityGetQueryHandler.cs',
                    renameTo: generator =>
                        `${generator.namespace}${PROJECT_APPLICATION_SUFFIX}/Queries/${generator.asEntity(
                            generator.entityClass
                        )}/${generator.asEntity(generator.entityClass)}GetQueryHandler.cs`,
                },
                {
                    file: 'Project.Application/Queries/EntityGetAllQuery.cs',
                    renameTo: generator =>
                        `${generator.namespace}${PROJECT_APPLICATION_SUFFIX}/Queries/${generator.asEntity(
                            generator.entityClass
                        )}/${generator.asEntity(generator.entityClass)}GetAllQuery.cs`,
                },
                {
                    file: 'Project.Application/Queries/EntityGetAllQueryHandler.cs',
                    renameTo: generator =>
                        `${generator.namespace}${PROJECT_APPLICATION_SUFFIX}/Queries/${generator.asEntity(
                            generator.entityClass
                        )}/${generator.asEntity(generator.entityClass)}GetAllQueryHandler.cs`,
                },
                {
                    file: 'Project.Application/Commands/EntityDeleteCommand.cs',
                    renameTo: generator =>
                        `${generator.namespace}${PROJECT_APPLICATION_SUFFIX}/Commands/${generator.asEntity(
                            generator.entityClass
                        )}/${generator.asEntity(generator.entityClass)}DeleteCommand.cs`,
                },
                {
                    file: 'Project.Application/Commands/EntityDeleteCommandHandler.cs',
                    renameTo: generator =>
                        `${generator.namespace}${PROJECT_APPLICATION_SUFFIX}/Commands/${generator.asEntity(
                            generator.entityClass
                        )}/${generator.asEntity(generator.entityClass)}DeleteCommandHandler.cs`,
                },
                {
                    file: 'Project.Application/Commands/EntityCreateCommand.cs',
                    renameTo: generator =>
                        `${generator.namespace}${PROJECT_APPLICATION_SUFFIX}/Commands/${generator.asEntity(
                            generator.entityClass
                        )}/${generator.asEntity(generator.entityClass)}CreateCommand.cs`,
                },
                {
                    file: 'Project.Application/Commands/EntityCreateCommandHandler.cs',
                    renameTo: generator =>
                        `${generator.namespace}${PROJECT_APPLICATION_SUFFIX}/Commands/${generator.asEntity(
                            generator.entityClass
                        )}/${generator.asEntity(generator.entityClass)}CreateCommandHandler.cs`,
                },
                {
                    file: 'Project.Application/Commands/EntityUpdateCommand.cs',
                    renameTo: generator =>
                        `${generator.namespace}${PROJECT_APPLICATION_SUFFIX}/Commands/${generator.asEntity(
                            generator.entityClass
                        )}/${generator.asEntity(generator.entityClass)}UpdateCommand.cs`,
                },
                {
                    file: 'Project.Application/Commands/EntityUpdateCommandHandler.cs',
                    renameTo: generator =>
                        `${generator.namespace}${PROJECT_APPLICATION_SUFFIX}/Commands/${generator.asEntity(
                            generator.entityClass
                        )}/${generator.asEntity(generator.entityClass)}UpdateCommandHandler.cs`,
                },
            ],
        },
        {
            condition: generator => generator.viewModel === 'mapstruct',
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Domain/ViewModels/ViewModel.cs',
                    renameTo: generator =>
                        `${generator.namespace}${constants.PROJECT_DOMAIN_SUFFIX}/ViewModels/${generator.asDto(
                            generator.entityClass
                        )}.cs`,
                },
            ],
        },
    ],
    db: [
        {
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Infrastructure/Data/ApplicationDatabaseContext.cs',
                    renameTo: generator =>
                        `${generator.namespace}${PROJECT_INFRASTRUCTURE_SUFFIX}/Data/ApplicationDatabaseContext.cs`,
                },
            ],
        },
    ],
    test: [
        {
            path: SERVER_TEST_DIR,
            templates: [
                {
                    file: 'Project.Test/Controllers/EntityControllerIntTest.cs',
                    renameTo: generator =>
                        `${generator.testProjectDir}/Controllers/${generator.asEntity(generator.entityClass)}ControllerIntTest.cs`,
                },
            ],
        },
    ],
    service: [
        {
            condition: generator => generator.service === 'serviceImpl' && generator.cqrsEnabled !== true,
            path: SERVER_SRC_DIR,
            templates: [
                {
                    file: 'Project.Domain.Services/Service.cs',
                    renameTo: generator => `${generator.namespace}${PROJECT_SERVICE_SUFFIX}/${generator.entityClass}Service.cs`,
                },
                {
                    file: 'Project.Domain/Services/Interfaces/IService.cs',
                    renameTo: generator =>
                        `${generator.namespace}${constants.PROJECT_DOMAIN_SUFFIX}/Services/I${generator.entityClass}Service.cs`,
                },
            ],
        },
    ],
};

const gatlingTestsFiles = {
    gatlingTests: [
        {
            condition: generator => generator.gatlingTests,
            path: SERVER_TEST_DIR,
            templates: [
                {
                    file: 'gatling/user-files/simulations/EntityGatlingTest.scala',
                    options: { interpolate: INTERPOLATE_REGEX },
                    renameTo: generator => `gatling/user-files/simulations/${generator.entityClass}GatlingTest.scala`,
                },
            ],
        },
    ],
};

function writeFiles() {
    return {
        writeServerFiles() {
            this.fields.forEach(field => {
                if (field.fieldIsEnum) {
                    if (!this.skipServer) {
                        const enumInfo = utils.getEnumInfo(field, this.clientRootFolder);
                        enumInfo.namespace = this.namespace;
                        const fieldType = field.fieldType;
                        this.template(
                            'dotnetcore/src/Project.Crosscutting/Enums/Enum.cs.ejs',
                            `src/${this.namespace}${PROJECT_CROSSCUTTING_SUFFIX}/Enums/${fieldType}.cs`,
                            this,
                            {},
                            enumInfo
                        );
                    }
                }
            });

            this.writeFilesToDisk(serverFiles, this, false, 'dotnetcore');
        },
        writeFilesGatling() {
            this.writeFilesToDisk(gatlingTestsFiles, this, false, this.fetchFromInstalledJHipster('entity-server/templates/src'));
        },
    };
}

module.exports = {
    serverFiles,
    writeFiles,
};
