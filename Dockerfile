# build frontend first
FROM node:latest
COPY . .
RUN cd src/main/web && yarn install && yarn build

# build executable jar
FROM maven:3.6.3-jdk-11
RUN mvn package -Pprod -Dmaven.test.skip=true -f pom.xml
EXPOSE 8080
ENTRYPOINT ["java","-jar","/target/teti-a.0.0.1.jar"]
