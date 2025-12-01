FROM maven:3.9.6-amazoncorretto-17 AS build
WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package -DskipTests

FROM amazoncorretto:17
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

ENV SPRING_PROFILES_ACTIVE=docker

# Debug remoto (porta diferente do stories-service)
ENV JAVA_TOOL_OPTIONS="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5007"

EXPOSE 8082
EXPOSE 5007

ENTRYPOINT ["java", "-jar", "app.jar"]