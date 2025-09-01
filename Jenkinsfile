pipeline {
  agent any

  tools {
    nodejs 'NodeJS-24.7.0'
    jdk    'Temurin-17'         // <= ต้องมีใน Tools
    // ถ้าตั้ง SonarScanner เป็น Tool ไว้ด้วย จะดีมาก
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/Thanaphum-6510110194/SonarQube-Integration.git'
      }
    }

    stage('Build') {
      steps {
        sh 'npm ci'
      }
    }

    stage('SonarQube Scan') {
      steps {
        withSonarQubeEnv('sonarqube-25.8.0.112029') { // <= ใช้ชื่อเดียวกับที่ config
          withEnv([
            "JAVA_HOME=${tool 'Temurin-17'}",
            "PATH+JAVA=${tool 'Temurin-17'}/bin",
            "SCANNER_HOME=${tool 'SonarScanner-6'}",
            "PATH+SCANNER=${tool 'SonarScanner-6'}/bin"
          ]) {
            sh '''
              sonar-scanner \
                -Dsonar.projectKey=SonarQube-Integration-with-Jenkins \
                -Dsonar.projectName="SonarQube Integration with Jenkins" \
                -Dsonar.sources=. \
                -Dsonar.sourceEncoding=UTF-8 \
                -Dsonar.host.url=$SONAR_HOST_URL \
                -Dsonar.login=$SONAR_AUTH_TOKEN
            '''
          }
        }
      }
    }

    stage('Quality Gate') {
      steps {
        timeout(time: 5, unit: 'MINUTES') {
          waitForQualityGate abortPipeline: true
        }
      }
    }
  }
}
