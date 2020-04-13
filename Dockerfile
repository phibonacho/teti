# build executable jar:
FROM maven:3.6.3-jdk-11
WORKDIR /opt/teti/

# this should optimize building time:
COPY ./pom.xml ./pom.xml
RUN mvn dependency:go-offline -B

# build frontend first
FROM node:latest
WORKDIR /opt/teti/frontend
COPY src/main/web/ ./
RUN yarn install && yarn build-prod

# package jar:
COPY ./src ./src
COPY /opt/teti/frontend/build/ ./src/main/resources/static
RUN mvn package -Pprod -Dmaven.test.skip=true -f pom.xml
EXPOSE 8080
ENTRYPOINT ["java","-jar","./target/teti-0.0.1-ultra-alpha.jar"]
