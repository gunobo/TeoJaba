FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app

# 의존성 캐싱 레이어 (pom.xml만 먼저 복사)
COPY pom.xml .
RUN mvn dependency:go-offline -q

# 소스 복사 후 빌드
COPY src ./src
RUN mvn package -DskipTests -q

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
