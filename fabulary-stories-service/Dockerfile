FROM maven:3.9.6-amazoncorretto-17 AS build
WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package -DskipTests

FROM amazoncorretto:17
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

# HABILITAR DEBUG REMOTO
ENV JAVA_TOOL_OPTIONS="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5006"

EXPOSE 8081
EXPOSE 5006

ENTRYPOINT ["java", "-jar", "app.jar"]