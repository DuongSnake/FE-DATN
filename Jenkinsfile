pipeline {
  agent {
    label 'BUILT-IN'
  }
  environment {
    DEPLOYMENT_NAME = 'bidv-admin-vite-web-test'
    DOCKER_IMAGE = "repo-img.infocms.com.vn/bidv-infoserver-dev-test/bidv-admin-vite-web-test:latest"
    DOCKER_FILE = './Dockerfile'
  }
  stages {
    stage('Login') {
      steps {
        script {
          // Login to Docker Hub using Jenkins global credentials
          withCredentials([usernamePassword(
            credentialsId: 'repo', // Use the Global credentials ID
            usernameVariable: 'DOCKERHUB_USERNAME',
            passwordVariable: 'DOCKERHUB_PASSWORD'
          )]) {
            sh "docker login https://repo-img.infocms.com.vn -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}"
          }
        }
      }
    }
    stage('Build') {
      steps {
        echo 'Building..'
        sh "docker build -t ${DOCKER_IMAGE} --security-opt=seccomp=unconfined -f ${DOCKER_FILE} ."
        sh 'docker push ${DOCKER_IMAGE}'
        echo 'Build Done..'
      }
    }
    stage('Deploy') {
      steps {
        echo 'Next Deploy job run....'
      }
    }
  }
}
