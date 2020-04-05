# build frontend first
FROM node:latest
WORKDIR /opt/teti/frontend
COPY src/main/web/ ./
RUN yarn install && yarn build-prod

# build executable jar
FROM maven:3.6.3-jdk-11
WORKDIR /opt/teti/
COPY . .
COPY --from=0 /opt/teti/frontend/build/ ./src/main/resources/static
RUN mvn package -Pprod -Dmaven.test.skip=true -f pom.xml
EXPOSE 8080
ENTRYPOINT ["java","-jar","./target/teti-a.0.0.1.jar"]
