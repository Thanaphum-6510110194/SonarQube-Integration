pipeline {
  agent any

  tools {
    nodejs 'NodeJS-24.7.0'
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/Thanaphum-6510110194/SonarQube-Integration.git'
      }
    }

    stage('Build') {
      steps {
        sh 'npm ci'   // เสถียรกว่า npm install ใน CI
      }
    }

    stage('SonarQube Scan') {
      steps {
        withSonarQubeEnv('sonarqube-25.8.0.112029') {
          sh '''
            npx sonar-scanner \
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

    stage('Quality Gate') {
      steps {
        timeout(time: 5, unit: 'MINUTES') {
          waitForQualityGate abortPipeline: true
        }
      }
    }
  }
}
